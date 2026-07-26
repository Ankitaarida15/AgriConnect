type CardProps = {
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-80">
      <h2 className="text-2xl font-bold text-green-700">
        {title}
      </h2>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded">
        Learn More
      </button>
    </div>
  );
}