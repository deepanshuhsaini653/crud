
class Movie {
  constructor(title, imageUrl, rate, price, duration, bestseller, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.rate = rate;
    this.price = price;
    this.duration = duration;
    this.bestseller = bestseller;
    this.description = description;
  }
}

class Attributes {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Component {
  constructor(renderHookId) {
    this.renderHookId = renderHookId;
  }

  createRootElement(tag, classes, attributes) {
    const rootElement = document.createElement(tag);
    if (classes) {
      rootElement.className = classes
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(att.name, att.value)
      }
    }
    document.getElementById(this.renderHookId).append(rootElement);
    return rootElement;
  }
}

class Header extends Component {
  constructor(renderHookId) {
    super(renderHookId)
  }

  showMovieBox = () => {
    const addmovieBox = document.getElementById('addmovieBox');
    if (addmovieBox.classList.value == "add__movie d-none") {
      addmovieBox.classList.remove('d-none');
    } else {
      addmovieBox.classList.add('d-none');
    }

  }

  render() {
    const renderHeader = this.createRootElement("header", "header");
    renderHeader.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <a href="index.html" class="header__logo">Movie Application</a>
          </div>
          <div class="col-md-6  text-right">
            <button class="add__movie btn" id="addmovie">Add Movie</buton>
            <button class="add__movie btn">Login</buton>
          </div>
        </div>
      </div>
    `;
    const addmovie = document.getElementById('addmovie');
    addmovie.addEventListener('click', this.showMovieBox)
  }
}

class AddMovie extends Component {
  constructor(renderHookId) {
    super(renderHookId)
  }

  addItem = () => {
    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const duration = document.getElementById('duration').value;
    const price = document.getElementById('price').value;
    const rate = document.getElementById('rate').value;
    const description = document.getElementById('description').value;

    App.addMovie(new Movie(title, imageUrl, rate, price, duration, true, description));
    App.renderMovieItems()
  }

  render() {
    const section = this.createRootElement('section', "add__movie");
    section.id = "addmovieBox";
    const container = document.createElement('div')
    container.className = "container mt-4 border p-3";
    container.innerHTML = `
      <div class="movie__box">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter Movie Name" id="title">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter Image URl" id="imageUrl">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter Duration" id="duration">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter Price" id="price">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter Rate" id="rate">
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <textarea  class="form-control" placeholder="Enter Description" id="description"></textarea>
            </div>
          </div>
          <div class="col-md-12">
             <button class="btn">Add Movie</button>
          </div>
        </div>
      </div>
    `;
    const button = container.querySelector('button');
    button.addEventListener('click', this.addItem);
    section.append(container);
  }
}


class MovieList extends Component {

  movies = [];

  addmovieItem(movie) {
    const { title, price, rate, description, duration, imageUrl } = movie;
    const getMovie = {
      title: title,
      price: price,
      rate: rate,
      description: description,
      duration: duration,
      imageUrl: imageUrl
    }
    this.movies.push(getMovie);
    console.log(this.movies)
  }

  constructor(renderHookId) {
    super(renderHookId)
  }

  render() {

    const movieEl = this.createRootElement("ul", "moviesec__list");
    movieEl.innerHTML = "";
    for (const movie of this.movies) {
      const movieitem = new MovieItem(movie);
      const li = movieitem.render()
      movieEl.append(li)
    }
  }
}

class MovieItem {
  constructor(movie) {
    this.movie = movie;
  }

  render() {
    const li = document.createElement('li');
    const { title, price, bestseller, description, rate, duration, imageUrl } = this.movie;
    li.innerHTML = `
      <div class="moviesec__item">
        <img src="${imageUrl}" attr="${title}">
        <h3>${title}</h3>
        <div class="d-flex justify-content-between border-top border-bottom pt-1 pb-1 mb-2 mt-3">
          <div><strong>Duration: </strong> ${duration}</div>
          <div><strong>Price: </strong> ${price}</div>
          <div><strong>Rate: </strong> ${rate}</div>
        </div>
        <p>${description}</p>
      </div>
    `;
    return li;
  }
}


class RenderApp {
  render() {
    const header = new Header('app');
    header.render()
    const addmovie = new AddMovie('app');
    addmovie.render()
    this.movie = new MovieList('app');
    this.movie.render()
  }
}

class App {
  static init() {
    const renderApp = new RenderApp();
    renderApp.render();
    this.movie = renderApp.movie;
  }
  static addMovie(movie) {
    this.movie.addmovieItem(movie);
  }
  static renderMovieItems() {
    this.movie.render()
  }
}

App.init()