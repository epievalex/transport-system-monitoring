import React from "react";
import { bindActionCreators, Dispatch } from "redux";

import * as carParkActions from "store/carPark/actions";
import { statusCodes } from "common/data/carPark/statuses";
import { columns } from "common/data/carPark";
import mapGif from "common/gifs/map.gif";

import styles from "./CarPark.module.css";
import classnames from "classnames";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "store";

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const CarPark: React.FC<Props> = ({ cars }) => {
  return (
    <div className={styles["car-park"]}>
      <div className={styles.table}>
        <div className={styles.row}>
          {columns.map((item) => (
            <div className={classnames(styles.cell, styles.column)}>{item}</div>
          ))}
        </div>
        {cars.map((car) => {
          return (
            <div className={styles.row}>
              <div className={styles.cell}>{car.courier?.fullName}</div>
              <div className={styles.cell}>{statusCodes[car.statusCode]}</div>
              <div className={styles.cell}>{car.brand}</div>
              <div className={styles.cell}>{car.stateNumber}</div>
              <div className={styles.cell}>{car.location.name}</div>
              <div className={styles.cell}>
                {car.fuel.value}
                {car.fuel.unit}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.map}>
        <img className={styles["map-gif"]} src={mapGif} alt="map-gif" />
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(carParkActions, dispatch);
}

function mapStateToProps(state: RootState) {
  return {
    cars: state.carPark.items,
  };
}

export default connector(CarPark);
