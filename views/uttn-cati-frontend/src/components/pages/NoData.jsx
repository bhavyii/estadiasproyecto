import React from "react";

export const NoData = () => {
  const goBack = (e) => {
    e.stopPropagation();
    history.back();
  };

  return (
    <div className="content">
      <div className="filter">
        <button onClick={goBack} className="primaryButton">
          <img src="../icons/back.png" alt="" />
        </button>
      </div>
      <div className="noData">
        <h1>No se encontraron dispositivos</h1>
      </div>
    </div>
  );
};
