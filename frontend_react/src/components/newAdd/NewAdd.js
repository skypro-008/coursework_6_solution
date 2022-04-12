import React from "react";
// import MainContext from "../../context/MainContext";
import AddCard from "../addCard/AddCard";

function NewAdd() {
//   const { addAd, setAds, ads, isLoading, setIsLoading } =
//     useContext(MainContext);

//   function handleAddAd(data) {
//     setIsLoading(true);
//     addAd(data)
//       .then((ad) => {
//         debugger
//         setAds([ad.data, ...ads]);
//         console.log(ad);
//         window.location.reload();
//       })
//       .catch((error) => console.log("error", error))
//       .finally(() => setTimeout(() => setIsLoading(false), 500));
//   }
  return (
    <main className="main">
      <AddCard />
    </main>
  );
}

export default NewAdd;
