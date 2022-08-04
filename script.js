let inputsAutocomplete = document.querySelectorAll('.cityAutoComplete')
let selectContainer = document.querySelector('.selectContainer');

inputsAutocomplete.forEach(input => {
    input.addEventListener('input', () => { autocomplete(this.event.target) })
});
async function autocomplete(input) {
    let url = `https://api-adresse.data.gouv.fr/search/?q=${input.value}&type=municipality&autocomplete=1`
    let dataResponse = await fetch(url)
    let data = await dataResponse.json()
    let cities = []
    data.features.forEach(city => {
      cities.push({name:city.properties.name,context:city.properties.context})
    })
    removeElements(input)
    cities.forEach(city => {
      let listItem = document.createElement("li");
      //One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", `citySelected("${city.name}")`);
      //Display matched part in bold
      let word = city.name.replace(input.value ,`<b>${input.value}</b>` )
      //display the value in array
      listItem.innerHTML = `<p>${word}</p><p>${city.context}</p>`;
      input.parentElement.querySelector(".list").appendChild(listItem);
    })
}

function citySelected(value) {
  let element = this.event.target.parentElement
  let input = element.parentElement.parentElement.querySelector('.cityAutoComplete')
  input.value = value
  removeElements(element);
}
function removeElements(input) {
  //clear all the item
  let items = input.parentElement.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}
