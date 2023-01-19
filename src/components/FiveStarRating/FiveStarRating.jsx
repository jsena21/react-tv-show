import s from "./style.module.css";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  // Déclarer un tableau d'étoiles (jsx) vide
  const startList = [];

  //   //Stocker dans une variable le nombre d'étoile pleine
  const StarFillCount = Math.floor(rating);

  //   //Stocker dans une variable si oui ou non il y a une demi étoile
  const hasStarHalf = rating - StarFillCount >= 0.5;

  //   //Stocker dans une variable une variable le nombre d'étoile vide
  const emptyStarCount = 5 - StarFillCount - (hasStarHalf ? 1 : 0);
  //Pusher dans le tableau les étoiles pleines
  for (let i = 1; i <= StarFillCount; i++) {
    startList.push(<StarFill key={"star-fill" + i} />);
  }
  //   //Pusher dans le tableau les demi étoiles
  if (hasStarHalf) {
    startList.push(<StarHalf key={"star-half"} />);
  }
  //   //Pusher dans le tableau les étoiles vides
  for (let i = 1; i <= emptyStarCount; i++) {
    startList.push(<StarEmpty key={"star-empty" + i} />);
  }
  return <div>{startList}</div>;
}
