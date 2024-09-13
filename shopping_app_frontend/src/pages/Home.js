import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import { onGetProducts } from '../store/actions';

const Home = () => {
    const { categories, products } = useSelector(state => state.shoppingReducer);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(onGetProducts());
    }, []);

    const listOfCategories = () => {
        return (
            <div className="row" aria-label="Basic example">
                {categories.map(item => (
                    <button key={item} type="button" onClick={() => handleCategoryClick(item)} className="btn btn-lg m-2" style={{ backgroundColor: '#000000', borderRadius: 30, color: '#FFF'}}>
                        {item.toUpperCase()}
                    </button>
                ))}
            </div>
        );
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    }

    const filteredProducts = selectedCategory ? products.filter(product => product.type === selectedCategory) : products;

    const listOfProducts = () => {
        return filteredProducts.map(item => <ProductCard key={item.id} item={item} />);
    }

    return (
        <div className="container-fluid p-0">
            <img src="bg.jpg" className="card-img" alt="..." />
            <div className="container-flud mb-4" style={{ height: 80, justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#F6F6F2'}}>
                <div className="row justify-content-center">
                    {categories && listOfCategories()}
                </div>
            </div> 
             
            <div className="d-flex flex-row flex-nowrap overflow-auto">
                {products && listOfProducts()}
            </div>
        </div>
    );
}

export { Home };
