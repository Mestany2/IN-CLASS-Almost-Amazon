import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  console.warn('my obj is', obj);
  clearDom();

  let domString = `
   <div class="text-white ms-5 details">
     <h5> Written by ${obj.authorObject.first_name} ${obj.authorObject.last_name} ${obj.authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
     Author Email: <a href="mailto:${obj.authorObject.email}">${obj.authorObject.email}</a>    
      </div>
    </div>`;
  obj.bookObject.forEach((item) => {
    domString += `
    <div class="mt-5 d-flex flex-wrap flex-column">
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <i class="btn btn-success" id="view-book-btn--${item.firebaseKey}">View</i>
            <i id="edit-book-btn--${item.firebaseKey}" class="btn btn-info">Edit</i>
            <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger">Delete</i>
        </div>
        </div>
      </div>`;
  });

  renderToDOM('#view', domString);
};

export default viewAuthor;
