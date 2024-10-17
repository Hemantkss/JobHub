import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Data Scientist",
  "Product Manager",
  "UX/UI Designer",
  "QA/Tester",
  "Project Manager",
  "Digital Marketing",
  "Help Desk",
  "Content Writer",
  "Analyst",
  "Content Strategist",
  "Content Creator",
  "Social Media Manager",
  "Marketing Manager",
  "Digital Advertising",
  "Business Analyst",
  "Finance Manager",
  "HR Manager",
  "Finance Analyst",
  "Legal Manager",
  "Compliance Manager",
  "Public Relations Manager",
  "Media Manager",
  "Team Lead",
  "Team Manager",
  "Operations Manager",
  "Finance Analyst",
];

const CategoryCarousel = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
}

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={() => searchJobHandler(cat)} className="rounded-full" variant="outline">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
