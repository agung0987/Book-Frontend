const BookView = () => {
  return (
    <div>
      <div className="flex justify-center mt-28">
        <table className="border-collapse border border-slate-500 ">
          <thead>
            <tr>
              <th className="border border-slate-600 ...">title</th>
              <th className="border border-slate-600 ...">description</th>
              <th className="border border-slate-600 ...">image_url</th>
              <th className="border border-slate-600 ...">release_year</th>
              <th className="border border-slate-600 ...">price</th>
              <th className="border border-slate-600 ...">total_page</th>
              <th className="border border-slate-600 ...">thickness</th>
              <th className="border border-slate-600 ...">category_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-700 ...">Indiana</td>
              <td className="border border-slate-700 ...">Indianapolis</td>
            </tr>
            <tr>
              <td className="border border-slate-700 ...">Ohio</td>
              <td className="border border-slate-700 ...">Columbus</td>
            </tr>
            <tr>
              <td className="border border-slate-700 ...">Michigan</td>
              <td className="border border-slate-700 ...">Detroit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookView;
