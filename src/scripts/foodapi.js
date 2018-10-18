let htmlTemp = function (object, apiObject) {

  let html = `
  <section class="foodItem" id=${object.id}>
  <h2>${object.name}</h2>
  <p>Type: ${object.type}</p>
  <p>Ethnicity: ${object.ethnicity}</p>
  <p>Side Dishes: ${object["side dishes"].join(", ")}</p>
  <p>Product Country of Origin: ${apiObject.product.countries_tags[0]}</p>
  <p>Fat Per Serving: ${apiObject.product.nutriments.fat_serving}</p>
  <p>Sugar Per Serving: ${apiObject.product.nutriments.sugars_serving}</p>
  <p class="ingredients">Ingredients: ${apiObject.product.ingredients_text_with_allergens}</p>
</section>
`
  return html
}

let appendFood = function (string) {
  let foodList = document.querySelector(".foodList")
  foodList.innerHTML += string
}

fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    parsedFoods.forEach((meal) => {
      fetch(`https://world.openfoodfacts.org/api/v0/product/${meal.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
          let html = htmlTemp(meal, productInfo);
          appendFood(html)
        })
    })
  })


 
 