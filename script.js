// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
    fruitsList.innerHTML = "";


    for (let i = 0; i < fruits.length; i++) {

        let elem = document.createElement("li");
        document.getElementsByClassName("fruits__list")[0].appendChild(elem);

        switch (fruits[i].color) {
            case "фиолетовый":
                elem.className = "fruit__item fruit_violet";
                break;
            case "зеленый":
                elem.className = "fruit__item fruit_green";
                break;
            case "розово-красный":
                elem.className = "fruit__item fruit_carmazin";
                break;
            case "желтый":
                elem.className = "fruit__item fruit_yellow";
                break;
            case "светло-коричневый":
                elem.className = "fruit__item fruit_lightbrown";
                break;
            default:
                elem.className = "fruit__item";
        }


        let elemDiv1 = document.createElement("div");
        let elemDiv2 = document.createElement("div");
        let elemDiv3 = document.createElement("div");
        let elemDiv4 = document.createElement("div");
        let elemDiv5 = document.createElement("div");

        elemDiv1.className = "fruit__info";
        elemDiv2.innerHTML = "index: " + i;
        elemDiv3.innerHTML = "kind: " + fruits[i].kind;
        elemDiv4.innerHTML = "color: " + fruits[i].color;
        elemDiv5.innerHTML = "weight (кг): " + fruits[i].weight;

        document.getElementsByClassName("fruit__item")[i].appendChild(elemDiv1);
        document.getElementsByClassName("fruit__info")[i].appendChild(elemDiv2);
        document.getElementsByClassName("fruit__info")[i].appendChild(elemDiv3);
        document.getElementsByClassName("fruit__info")[i].appendChild(elemDiv4);
        document.getElementsByClassName("fruit__info")[i].appendChild(elemDiv5);

    }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
    let result = [];
    let i = 0;
    const fruitsCopy = fruits.slice();
    const fruitLength = fruitsCopy.length;


    while (fruits.length > 0) {
        let j = getRandomInt(0, fruits.length - 1);
        result[i] = fruits[j];
        fruits.splice(j, 1);
        i++;
    }

    let n = 0;
    for (let k = 0; k < fruitLength; k++) {
        if (result[k] == fruitsCopy[k]) {
            n++;
        }
    }

    if (n == fruitLength)
        alert('Порядок не изменился!');

    fruits = result;
};

shuffleButton.addEventListener('click', () => {
    shuffleFruits();
    display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
    const minWeight = document.getElementsByClassName('minweight__input')[0];
    const maxWeight = document.getElementsByClassName('maxweight__input')[0];
    let result = fruits.filter((item) =>
        item.weight <= maxWeight.value && item.weight >= minWeight.value
    );

    fruits = result;
};

filterButton.addEventListener('click', () => {
    filterFruits();
    display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (fruit1, fruit2) => {
    // TODO: допишите функцию сравнения двух элементов по цвету
    const priority = ['розово-красный', 'светло-коричневый', 'желтый', 'зеленый', 'фиолетовый']
    const priority1 = priority.indexOf(fruit1.color);
    const priority2 = priority.indexOf(fruit2.color);
    return priority1 > priority2;
};

const sortAPI = {

    // выполняет сортировку и производит замер времени
    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sort(arr, comparation);
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;
    },

    bubbleSort(arr, comparation) {
        const n = arr.length;
        // внешняя итерация по элементам
        for (let i = 0; i < n - 1; i++) {
            // внутренняя итерация для перестановки элемента в конец массива
            for (let j = 0; j < n - 1 - i; j++) {
                // сравниваем элементы
                if (comparation(arr[j], arr[j + 1])) {
                    // делаем обмен элементов
                    let temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;


sortActionButton.addEventListener('click', () => {
    sortTimeLabel.innerHTML = 'sorting...';
    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor);
    display();
    sortTimeLabel.innerHTML = sortTime;
});