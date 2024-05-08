import { useState, useEffect } from "react";
const App = () => {
  const [myCard, setMyCard] = useState([]);

  useEffect(() => {
    mockShop();
  }, []);

  const mockShop = async () => {
    const response = await fetch(
      `https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}`
    );
    const getAllData = await response.json();
    console.log(response.status);
    // console.log(getAllData);
    setMyCard(getAllData.data.products.edges);
  };

  return (
    <div className="flex flex-row flex-wrap justify-center gap-5 m-8">
      {myCard.map((values) => {
        return (
          <>
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                class="p-8 rounded-t-lg"
                src={values.node.featuredImage.url}
                alt="product image"
              />

              <div class="px-5 pb-5">
                <a href="#">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {values.node.title}
                  </h5>
                </a>
                <h5 class="text-sm font-semibold tracking-tight text-gray-900 my-4 dark:text-white">
                  {values.node.description}
                </h5>

                <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">
                    ${values.node.variants.edges[0].node.price.amount}
                  </span>
                  <a
                    href="#"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default App;
