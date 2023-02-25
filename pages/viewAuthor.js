import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthBooks = (array) => {
  clearDom();

  let domString = '';
  array.forEach((item) => {
    domString += `
    <div class="mt-5 d-flex flex-wrap">
    <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
    <div class="card-body" style="height: 180px;">
      <h5 class="card-title">${item.title}</h5>
        <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
        <hr>
        <i class="btn btn-success" id="view-book-btn--${item.firebaseKey}">View</i>
        <i id="edit-book-btn--${item.firebaseKey}" class="btn btn-info">Edit</i>
        <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger">Delete</i>
    </div>
  </div`;

    renderToDOM('#view', domString);
  });
};

export default viewAuthBooks;
