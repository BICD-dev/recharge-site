// import type { FC } from "react";
// import type { Blog } from "../../../constants/types/blog";
// import { format } from "date-fns";
// import {Link} from "react-router-dom";

// const BlogCard = ({ blog }: { blog: Blog }) => {
//     const { title, coverImage, excerpt, date, slug } = blog;
//     return (
//         <>
//             <Link to={`/blog/${slug}`} className="group mb-10 flex items-center gap-9">
//                 <div className="overflow-hidden rounded-lg">
//                     <img 
//                         src={coverImage}
//                         alt="image"
//                         width={300}
//                         height={250}
//                         className="group-hover:scale-110 duration-300"
//                     />
//                 </div>
//                 <div className="">
//                     <span className="text-16 text-dark_grey mb-1">
//                         {format(new Date(date), "MMM dd yyyy")}
//                     </span>
//                     <h5 className="text-22 font-medium mb-9 group-hover:text-primary">
//                         {title}
//                     </h5>
//                     <p className="text-primary text-17 font-medium ">
//                         Read More
//                     </p>
//                 </div>
//             </Link>
//         </>
//     );
// };

// export default BlogCard;