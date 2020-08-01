FROM mcr.microsoft.com/dotnet/core/aspnet AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk
WORKDIR /src
COPY ["Template.Web.csproj", "Template.Web/"]
RUN dotnet restore "Template.Web/Template.Web.csproj"
COPY . .
WORKDIR "/src/Template.Web"
RUN dotnet build "Template.Web.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Template.Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Template.Web.dll"]