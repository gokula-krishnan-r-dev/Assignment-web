import React from "react";
import { Link } from "react-router-dom";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
  title: string;
  path: string;
};

export default function BreadCrumb({
  items,
  title,
  path,
}: BreadCrumbPropsType) {
  return (
    <div className="bread-crumb">
      <Link to={path} className="">
        {title}
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          {" "}
          /{" "}
          <Link to={item.link} className={""}>
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
