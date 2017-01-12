
Create Procedure usp_RandomInsertGenerator
(
	@TableName nvarchar(128)
)
As

-- does foreign keys
-- max character length
-- standard data types
-- identity columns
-- detects nullable columns and leaves as null

-- doesn't do
-- omitted datatypes - binary, varbinary, image, timestamp

-- Hacks
-- foreign key links where linked to child table via a unique index rather than a primary key. Assumpts FK of 1

-- assumes 
-- foregn keys are of a numeric type i.e. ints, tinyints, floats etc...
-- assumes foreign key constraints exist

Begin

	Set NoCount On

	Declare @ColumnName nvarchar(128)
	Declare @FK_TableName nvarchar(128)
	Declare @FK_ColumnName nvarchar(128)
	Declare @ConstraintName nvarchar(128)
	Declare @DataType nvarchar(128)
	Declare @CharacterMaximumLength int
	Declare @Sql nvarchar(max)
	Declare @MaxValue int
	Declare @InsertValue nvarchar(400)
	Declare @SqlOutputFields nvarchar(max)
	Declare @SqlOutputValues nvarchar(max)
	Declare @FirstLoop bit
	Declare @IsIdentity bit
	Declare @StringInsert bit
	Declare @DummyText varchar(48)

	Set @FirstLoop = 1
	Set @SqlOutputFields = 'INSERT INTO ' + @TableName + ' ('
	Set @SqlOutputValues = ' VALUES ('
	Set @DummyText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

	-- cursor loops through every column for named table
	Declare procCursor CURSOR FORWARD_ONLY
	For 
	Select 
		COLUMN_NAME, 
		DATA_TYPE, 
		CHARACTER_MAXIMUM_LENGTH 
	From 
		INFORMATION_SCHEMA.COLUMNS col
	Where 
		TABLE_NAME = @TableName
		And IS_NULLABLE = 'NO'
	Order By 
		ORDINAL_POSITION

	Open procCursor
	Fetch Next From procCursor Into @ColumnName, @DataType, @CharacterMaximumLength

	while @@fetch_status <> -1
	Begin
		
		-- datatypes i haven't bothered implementing
		if @DataType = 'cursor' OR @DataType = 'timestamp' 
			Or @DataType = 'binary'	Or @DataType = 'varbinary' Or @DataType = 'image'
		Begin
			Raiserror('Unsupported Data Type', 1, 16)
		End

		--reset variables
		Set @FK_TableName = ''
		Set @FK_ColumnName = ''
		Set @StringInsert = 0
		Set @ConstraintName = ''
		
		-- Don't add in an insert value if the loop is an identity
		Select @IsIdentity = COLUMNPROPERTY(OBJECT_ID(@TableName),@ColumnName,'IsIdentity')
		if @IsIdentity = 1		
		Begin
			Fetch Next From procCursor Into @ColumnName, @DataType, @CharacterMaximumLength
			continue
		End
		
		-- getting the value to be inserted for this data type
		if @DataType = 'varchar' Or @DataType = 'nvarchar' 
			Or @DataType = 'char' Or @DataType = 'nchar'
			Or @DataType = 'text' Or @DataType = 'ntext'
		Begin
			Set @StringInsert = 1
			Set @InsertValue = SubString(@DummyText, 1, @CharacterMaximumLength)
		End
		Else if @DataType = 'datetime' Or @DataType = 'smalldatetime'
		Begin
			Set @StringInsert = 1
			Set @InsertValue = Cast(GetDate() as varchar(20))
		End
		Else if @DataType = 'uniqueidentifier'
		Begin
			
			Set @StringInsert = 1
			Set @InsertValue = Cast(NewId() as varchar(200))
		End
		Else -- it is some key of numeric type
		Begin
			
			-- getting the child table indexes
			Set @Sql = '
			Select 
				@FK_TableName = pkconst.TABLE_NAME,
				@FK_ColumnName = pkconst.COLUMN_NAME,
				@ConstraintName = coluse.CONSTRAINT_NAME
			From  
			INFORMATION_SCHEMA.KEY_COLUMN_USAGE coluse 
			Join INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS fkconst 
					On fkconst.CONSTRAINT_NAME = coluse.CONSTRAINT_NAME
			Left Join INFORMATION_SCHEMA.KEY_COLUMN_USAGE pkconst 
					On pkconst.CONSTRAINT_NAME = fkconst.UNIQUE_CONSTRAINT_NAME
			Where 
				coluse.TABLE_NAME = @TableName 
				And coluse.COLUMN_NAME = @ColumnName'


			Execute sp_executesql @Sql, N'@TableName nvarchar(128), 
											@ColumnName nvarchar(128), 
											@FK_TableName nvarchar(128) OUTPUT, 
											@FK_ColumnName nvarchar(128) OUTPUT,
											@ConstraintName nvarchar(128) OUTPUT', 
											@TableName=@TableName, 
											@ColumnName=@ColumnName, 
											@FK_TableName=@FK_TableName OUTPUT, 
											@FK_ColumnName=@FK_ColumnName OUTPUT,
											@ConstraintName=@ConstraintName OUTPUT
			
			if Len(@FK_TableName) > 0 And Len(@FK_ColumnName) > 0
			Begin		

				/* have found foreign key and the lookup table 
				so pick a random primary key from the lookup table */
				Set @Sql = 'Select top 1 @InsertValue = Cast(' + @FK_ColumnName + 
							' as varchar(200)) From ' 
							+ @FK_TableName + ' Order By newid()'
				Execute sp_executesql @Sql, N'@InsertValue nvarchar(128) OUTPUT', @InsertValue=@InsertValue OUTPUT

			End
			Else if(Len(@ConstraintName) > 0)
			Begin
					
				/* OK we've found the foreign key constraint but have no idea what the
				lookup table is. This is because we are joining on a unique index to the 
				lookup table not a primary key. Make a MASSIVE assumption in this instance
				- that the lookup table has a link value of 1 */
				Set @InsertValue = '1'	

			End
			Else
			Begin
				-- no foreign key so the max that can be inserted is based on the datatype
				-- don't bother with any thing greater than thirty thousand - big enough
				if @DataType = 'bit'
					Set @MaxValue = 1
				else if @DataType = 'tinyint'
					Set @MaxValue = 255
				else if @DataType = 'smallint'
					Set @MaxValue = 32767
				else
					Set @MaxValue = 32767
				
				-- randomly generate a number to insert up to maximum
				Set @InsertValue = Cast(ROUND(((@MaxValue - 1) * RAND() + 1), 0) as varchar(200))	
				
			End
		End -- end of numeric processing
		
		-- building up output string
		Declare @Delimiter char(1)
		if @FirstLoop = 1
		Begin
			Set @FirstLoop = 0
			Set @Delimiter = ''
		End
		Else
		Begin
			Set @Delimiter = ','
		End

		Set @SqlOutputFields = @SqlOutputFields + @Delimiter + @ColumnName
		
		if @StringInsert = 1
		Begin
			Set @SqlOutputValues = @SqlOutputValues + @Delimiter + '''' + @InsertValue + ''''
		End
		Else
		Begin
			Set @SqlOutputValues = @SqlOutputValues + @Delimiter + @InsertValue		
		End

		Fetch Next From procCursor Into @ColumnName, @DataType, @CharacterMaximumLength
	End -- finished this column = go to next

	close procCursor
	deallocate procCursor

	-- outputting the sql string
	Set @SqlOutputFields = @SqlOutputFields + ')'
	Set @SqlOutputValues = @SqlOutputValues + ')'

	select @SqlOutputFields + ' ' + @SqlOutputValues

End	
Go

Create Procedure usp_RandomInsertGeneratorWrapper
(
	@TableName nvarchar(128),
	@NumberOfInserts int
)
As
Begin
	
	Set NoCount On

	Declare @StatementCount int
	Set @StatementCount = 0

	While @StatementCount < @NumberOfInserts
	Begin
	
		exec usp_RandomInsertGenerator @TableName
		Set @StatementCount = @StatementCount + 1
	End

End
