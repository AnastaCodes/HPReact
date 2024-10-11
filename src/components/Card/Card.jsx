import { useState } from "react";
import s from "./Card.module.css";
import unliked from '../../assets/unliked.svg' 
import liked from '../../assets/liked.svg' 

export const Card = ({
  image,
  name,
  actor,
  gender,
  house,
  wandCore,
  alive,
  //like,
  onTest,
  isFavorite
}) => {
  const [like, setLike] = useState(false);
  
function action(){
  setLike(!like);
  onTest()
}

  return (
    <div className={s.card}>
      <img className={s.image} src={image} />
      <div className={s.cardWrapper}>
      <div className={s.name}>{name}</div>
        <div className={s.name}>{isFavorite ? 'true' : 'false'}</div>
        <div className={s.text}>Actor: {actor}</div>
        <div className={s.text}>Gender: {gender}</div>
        <div className={s.text}>House: {house}</div>
        <div className={s.text}>Wand core: {wandCore}</div>
        <div className={s.text}>Alive: {alive}</div>
      </div>

      <button className={s.like} onClick={action} >
        <img src={ isFavorite ? liked : unliked}  alt="like" className={s.img} /> 
      </button >
    </div>
  );
};
