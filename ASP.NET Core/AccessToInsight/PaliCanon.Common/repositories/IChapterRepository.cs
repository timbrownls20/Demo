using PaliCanon.Common.Model;

namespace PaliCanon.Common.Repository
{
    public interface IChapterRepository: IRepository<Chapter>
    {
       Chapter Get(int id, string bookCode);
    }
}