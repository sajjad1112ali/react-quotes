import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuotes } from "../../redux";
import Loader from "../../components/Loader";

function Home() {
  const blogsData = useSelector((state) => state.quotes);
  const { quotes, loading, error } = blogsData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuotes());
  }, []);

  return (
    <section>
      <div>
        {
          loading ? <Loader /> :
          quotes.map((item) =>(<div key={item.id} sx={{ mt: 1.5 }}>
          {item.quote}
        </div>))
        }
        
      </div>
    </section>
  );
}

export default Home;
