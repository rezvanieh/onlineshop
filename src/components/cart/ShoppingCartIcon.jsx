const ShoppingCartIcon = ({ count }) => (
  <div className="relative">
    <i className="fas fa-shopping-cart text-2xl cursor-pointer"></i>
    {count > 0 && (
      <div className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full">
        {count}
      </div>
    )}
  </div>
);

export default ShoppingCartIcon;
