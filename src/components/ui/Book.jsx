import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Price from "./Price";

const SKELETON_MIN_TIME = 300; // milliseconds

const Book = ({ book }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [book.url]);

  useEffect(() => {
    // If image is cached, still show skeleton for SKELETON_MIN_TIME
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth !== 0) {
      timeoutRef.current = setTimeout(() => setImgLoaded(true), SKELETON_MIN_TIME);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [book.url]);

  const handleLoad = () => {
    timeoutRef.current = setTimeout(() => setImgLoaded(true), SKELETON_MIN_TIME);
  };

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div className="book">
      {!imgLoaded && !imgError && (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      )}
      <Link to={`/books/${book.id}`}>
        <figure className="book__img--wrapper">
          <img
            ref={imgRef}
            src={book.url}
            alt={book.title}
            className="book__img"
            style={{ display: imgLoaded && !imgError ? "block" : "none" }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </figure>
      </Link>
      {imgLoaded && !imgError && (
        <>
          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>
          <Rating rating={book.rating} />
          <Price salePrice={book.salePrice} originalPrice={book.originalPrice} />
        </>
      )}
      {imgError && (
        <>
          <div className="book__img--skeleton">Image failed to load</div>
          <div className="book__title">{book.title}</div>
        </>
      )}
    </div>
  );
};

export default Book;