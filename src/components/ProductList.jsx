const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-2">No products yet</h3>
        <p className="text-gray-400">Get started by adding your first product.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 overflow-hidden rounded-lg">
      <ul className="divide-y divide-gray-700">
        {products.map((product) => (
          <li key={product.id} className="px-6 py-4 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                      {product.category}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.inStock ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                      {product.stock} units
                    </span>
                  </div>
                </div>
                {product.description && (
                  <p className="mt-1 text-sm text-gray-400">{product.description}</p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">${product.price}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-gray-300 hover:text-white text-sm font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-gray-300 hover:text-white text-sm font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
