import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useFetch from "./hooks/useFetch";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
const Dhoni = () => {
  let [page, setPage] = useState(0);
  let { data, isLoading, error } = useFetch(
    `https://paginationv1.herokuapp.com/pics?page=${page}`
  );
  let [pics, setPics] = useState([]);
  if (isLoading) {
    return (
      <div className="flex">
        <div className="continuous-4"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex">
        <p className="error">404 page Not found</p>
      </div>
    );
  }
  let increase = () => {
    if (page >= data.total - 1) {
      setPage(0);
    } else {
      setPage((page) => page + 1);
    }
  };
  let decrease = () => {
    if (page == 0) {
      setPage(data.total - 2);
    } else {
      setPage((page) => page - 1);
    }
  };
  return (
    <div className="container">
      <div className="buttons">
        <button onClick={decrease}>
          <BsFillArrowLeftCircleFill />
        </button>
        <div className="nums">
          {[...new Array(data?.total).fill(1)].map((num, index) => (
            <button
              key={index}
              className={page == index ? "active" : ""}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={increase}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "tween", duration: "0.3" }}
        className="pics"
      >
        {data?.pics?.map((pic) => {
          return (
            <div key={pic._id}>
              <Image
                width={200}
                alt={pic.caption}
                height={200}
                src={pic.image}
                layout="responsive"
              />
              <p>{pic.caption}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dhoni;
