import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import MainContext from "../../context/MainContext";
import Promo from "../promo/Promo";
import { Link as NavLink } from "react-router-dom";
import SearchForm from "../searchForm/SearchForm";
import Cards from "../cards/Cards";
import { Pagination, Stack, PaginationItem } from "@mui/material";

function Main(props) {
  const [pageQty, setPageQty] = useState(0);
  const [adsDefault, setAdsDefault] = useState([]);
  const [ad, setAd] = useState("");
  const [page, setPage] = useState(
    parseInt(props.location.search?.split("=")[1] || 1)
  );
  let { user } = useContext(AuthContext);
  let { ads, setAds } = useContext(MainContext);
  const BASE_URL_OPEN = "http://127.0.0.1:8000/ads/?";
  const BASE_URL = "/ads/?"
  let api = useAxios();

  useEffect(() => {
    user ? getAllAds() : getAds();
  }, [page, ad]);

  const getAllAds = async () => {
    const response = await api.get(BASE_URL + `page=${page}`);

    if (response.status === 200) {
      setAds(response.data.results);
      setPageQty(Math.round(response.data.count / 3.2));
      if(Math.round(response.data.count / 3.2) < page) {
        setPage(1);
        props.history.replace("/")
      }
    }
  };

  const getAds = async () => {
    const response = await fetch(BASE_URL_OPEN + `page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setAdsDefault(data.results);
      setPageQty(Math.round(data.count / 3.2));
      if(Math.round(data.count / 3.2) < page || NaN) {
        setPage(1);
        props.history.replace("/")
      }
    } else {
      alert("we found the mistake");
    }
  };

  const filteredAds = user ? ads : adsDefault;
  
  function handleFilteredAds(ad) {
    return filteredAds.filter((value) =>
      value.title.toLowerCase().includes(ad.toLowerCase())
    );
  }


  return (
    <main className="Main">
      <Promo />
      <SearchForm ad={ad} setAd={setAd} onFilter={handleFilteredAds}/>
          <Stack spacing={2}>
            <Pagination
              count={pageQty}
              page={page}
              onChange={(_, num) => setPage(num)}
              showFirstButton
              showLastButton
              sx={{ marginY: 3, marginX: "auto", color: "white" }}
              renderItem={(item) => (
                <PaginationItem
                  component={NavLink}
                  to={`/?page=${item.page}`}
                  onChange={(_, num) => setPage(num)}
                  {...item}
                />
              )}
            />
            <Cards ads={filteredAds}/>
          </Stack>
    </main>
  );
}

export default Main;
