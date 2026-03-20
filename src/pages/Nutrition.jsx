import React, { useState } from 'react';
import { Coffee, UtensilsCrossed, Cookie, Search, Plus, Trash2 } from 'lucide-react';
import './Nutrition.css';

export default function Nutrition() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Breakfast');
  const [cart, setCart] = useState([]);

  const mealPlans = [
    {
      category: 'Breakfast',
      icon: Coffee,
      meals: [
        {
          name: 'Protein Power Bowl',
          calories: 450,
          protein: 35,
          carbs: 45,
          fats: 15,
          ingredients: ['Oatmeal', 'Greek Yogurt', 'Berries', 'Almonds', 'Honey'],
          image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Avocado Toast Deluxe',
          calories: 380,
          protein: 18,
          carbs: 35,
          fats: 22,
          ingredients: ['Whole Grain Bread', 'Avocado', 'Eggs', 'Cherry Tomatoes', 'Feta'],
          image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Berry Smoothie Bowl',
          calories: 320,
          protein: 20,
          carbs: 48,
          fats: 8,
          ingredients: ['Mixed Berries', 'Banana', 'Protein Powder', 'Granola', 'Chia Seeds'],
          image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=1200'
        }
      ]
    },
    {
      category: 'Lunch',
      icon: UtensilsCrossed,
      meals: [
        {
          name: 'Grilled Chicken Salad',
          calories: 520,
          protein: 45,
          carbs: 35,
          fats: 20,
          ingredients: ['Chicken Breast', 'Mixed Greens', 'Quinoa', 'Cherry Tomatoes', 'Olive Oil'],
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Salmon & Sweet Potato',
          calories: 580,
          protein: 42,
          carbs: 48,
          fats: 22,
          ingredients: ['Grilled Salmon', 'Sweet Potato', 'Broccoli', 'Lemon', 'Herbs'],
          image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Mediterranean Bowl',
          calories: 490,
          protein: 28,
          carbs: 52,
          fats: 18,
          ingredients: ['Chickpeas', 'Brown Rice', 'Cucumber', 'Hummus', 'Olives'],
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1200'
        }
      ]
    },
    {
      category: 'Dinner',
      icon: UtensilsCrossed,
      meals: [
        {
          name: 'Lean Beef Stir-fry',
          calories: 560,
          protein: 48,
          carbs: 42,
          fats: 18,
          ingredients: ['Lean Beef', 'Mixed Vegetables', 'Brown Rice', 'Soy Sauce', 'Ginger'],
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Turkey Meatballs Pasta',
          calories: 620,
          protein: 52,
          carbs: 58,
          fats: 16,
          ingredients: ['Turkey Meatballs', 'Whole Wheat Pasta', 'Tomato Sauce', 'Basil', 'Parmesan'],
          image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Grilled Fish Tacos',
          calories: 480,
          protein: 38,
          carbs: 45,
          fats: 14,
          ingredients: ['White Fish', 'Corn Tortillas', 'Cabbage', 'Avocado', 'Lime'],
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=1200'
        }
      ]
    },
    {
      category: 'Snacks',
      icon: Cookie,
      meals: [
        {
          name: 'Protein Energy Balls',
          calories: 180,
          protein: 12,
          carbs: 18,
          fats: 8,
          ingredients: ['Dates', 'Protein Powder', 'Oats', 'Almond Butter', 'Dark Chocolate'],
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Greek Yogurt Parfait',
          calories: 220,
          protein: 18,
          carbs: 25,
          fats: 6,
          ingredients: ['Greek Yogurt', 'Berries', 'Granola', 'Honey', 'Nuts'],
          image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=1200'
        },
        {
          name: 'Apple & Almond Butter',
          calories: 200,
          protein: 6,
          carbs: 28,
          fats: 10,
          ingredients: ['Apple', 'Almond Butter', 'Cinnamon'],
          image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80&w=1200'
        }
      ]
    }
  ];

  const addMealToCart = (meal) => {
    setCart((prev) => [...prev, { name: meal.name, calories: meal.calories }]);
  };

  const removeMealFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCalories = cart.reduce((sum, m) => sum + (m.calories || 0), 0);

  const submitMeals = async () => {
    if (cart.length === 0) {
      alert('Your nutrition cart is empty');
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      alert('Please log in to save meals to your plan.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/meals/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          meals: cart.map((m) => ({ calories: m.calories }))
        })
      });

      if (response.ok) {
        alert('Meals submitted successfully!');
        setCart([]);
      } else {
        alert('Failed to submit meals');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit meals. Is the backend running?');
    }
  };

  const nutritionTips = [
    'Drink at least 8 glasses of water daily',
    'Include protein in every meal',
    'Eat 5-6 small meals throughout the day',
    'Choose complex carbs over simple sugars',
    'Include healthy fats from nuts and fish',
    'Eat a rainbow of vegetables daily'
  ];

  return (
    <div className="nutrition-page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">
            Nutrition <span className="gradient-text">Guide</span>
          </h1>
          <p className="page-subtitle">
            Discover healthy meal plans tailored to your fitness goals
          </p>
        </div>

        <aside className="nutrition-side-cart" aria-label="Nutrition cart">
          <h3>Nutrition Cart</h3>
          {cart.length === 0 ? (
            <p className="nutrition-cart-empty">Add meals from the grid below.</p>
          ) : (
            <ul className="nutrition-cart-list">
              {cart.map((item, index) => (
                <li key={`${item.name}-${index}`} className="nutrition-cart-row">
                  <span className="nutrition-cart-meal">{item.name}</span>
                  <span className="nutrition-cart-kcal">{item.calories} kcal</span>
                  <button
                    type="button"
                    className="nutrition-cart-remove"
                    onClick={() => removeMealFromCart(index)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="nutrition-cart-total">Total: {totalCalories} kcal</p>
          <button type="button" className="nutrition-cart-submit" onClick={submitMeals}>
            Submit meal plan
          </button>
        </aside>

        <div className="search-container">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="tabs-container">
          {mealPlans.map((category) => (
            <button
              key={category.category}
              className={`tab-btn ${activeTab === category.category ? "active" : ""}`}
              onClick={() => setActiveTab(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="recipes-grid">
          {mealPlans
            .find((c) => c.category === activeTab)
            ?.meals.filter((meal) =>
              meal.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((meal, index) => (
              <div key={index} className="card recipe-card">
                <div className="recipe-image-container">
                  <img src={meal.image} alt={meal.name} className="recipe-image" />
                  <span className="calorie-badge">{meal.calories} kcal</span>
                </div>

                <div className="recipe-info">
                  <h3 className="recipe-title">{meal.name}</h3>

                  <div className="recipe-nutrients">
                    Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fats: {meal.fats}g
                  </div>

                  <div className="ingredients">
                    {meal.ingredients.join(', ')}
                  </div>

                  <button
                    type="button"
                    className="add-meal-btn"
                    onClick={() => addMealToCart(meal)}
                  >
                    <Plus size={16} /> Add to cart
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="card tips-card">
          <h3>Nutrition Tips</h3>
          <div className="tips-grid">
            {nutritionTips.map((tip, index) => (
              <div key={index} className="tip-item">
                <span className="tip-number">{index + 1}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}