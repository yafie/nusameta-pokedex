interface CardProps {
  id: number;
  name: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ id, name, imageSrc }) => {
  return (
    <div className="bg-slate-100 p-10 rounded-md flex flex-col items-center cursor-pointer hover:opacity-75">
      <a href={"/pokemon/" + id}>
        <img src={imageSrc} alt={`Image ${name}`} className="h-[200px]" />
        <div className="mt-2 pl-0 sm:pl-2 flex flex-col justify-center items-center">
          <h4 className="text-md text-black text-center font-semibold capitalize">
            {name}
          </h4>
        </div>
      </a>
    </div>
  );
};

export default Card;
