import data from '../data.json';
import ProductCard from './components/ProductCard';

export default function Home() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 place-items-center mx-4'>
      {data.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
