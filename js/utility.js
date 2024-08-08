const PRODUCT_CATALOG_JSON_FILE_PATH = "./data/product-catalog.json";
const NO_IMAGE_FILE_PATH = "./images/no-image-available-sm.png";
/* Declaration related to product catalog table */
var productCatalogTableHeader = `<div id="accordion">`;
var productCatalogTableCatalogNameTemplate = `<div class="card">
                                                <div class="card-header product-catalog-category">
                                                    <a class="card-link" data-toggle="collapse" href="#{0}">
                                                    {0}
                                                    </a>
                                                </div>
                                                <div id="{0}" class="collapse show" data-parent="#accordion">
                                                    <div class="card-body">
                                                        <table id="productCatalogTable" class="table table-hover table-striped table-responsive-lg product-catalog-table-class">
                                                            <thead class="text-center">
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Composition</th>
                                                                    <th>Pack Size</th>
                                                                    <th>Form</th>
                                                                    <th>Pack</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>`;
var productCatalogTableProductDetailsTemplate = `<tr>
                                                <td class="align-middle cell-data-wrap detail-font-size" title="{0}">{0}</td>
                                                <td class="align-middle cell-data-wrap detail-font-size" title="{1}">{1}</td>
                                                <td class="align-middle cell-data-wrap detail-font-size text-center" title="{2}">{2}</td>
                                                <td class="align-middle cell-data-wrap detail-font-size text-center" title="{3}">{3}</td>
                                                <td class="align-middle cell-data-wrap detail-font-size text-center" title="{4}">{4}</td>
                                                <td class="text-center cell-data-wrap">
                                                    <button type="button" 
                                                        class="btn btn-success product-img-button detail-font-size"
                                                        product-img-url="{5}">
                                                        View Image 
                                                        <span class="badge badge-success">
                                                            <i class="fa fa-picture-o icon-size-normal" aria-hidden="true"></i>
                                                        </span>
                                                    </button>
                                                </td>
                                                </tr>`;
var productCatalogTableFooter1 = `</tbody>
                                </table>
                                </div>
                                </div>
                                </div>`;
var productCatalogTableFooter2 = `</div>`;

/* Defined a format utility function to replace placeholders in string with actual values */
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (curlyBrack, index) {
        return ((curlyBrack == "{{") ? "{" : ((curlyBrack == "}}") ? "}" : args[index]));
    });
}

/* Function  to set product catalog table in container of specified container ID*/
function setProductCatalogTableInContainerWithID(containerElementId) {
    /* Called function to get catalog data and generated product catalog table
     element and set in container having specified ID */
    getProductCatalogData(containerElementId);
}

/* Function to make ajax call to get data from product-catalog.json file. 
Once data is received, create product table element.*/
function getProductCatalogData(containerElementId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', PRODUCT_CATALOG_JSON_FILE_PATH, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
            /* Parse json data read from file */
            var productCatalogJson = JSON.parse(this.responseText);
            /* Get json object inside 'data' key */
            var productCatalogData = productCatalogJson.data;
            /* Called method to generate product catalog table element */
            createProductCatalogTable(productCatalogData, containerElementId);
        }
    }
    xhr.send();
}

/* Function to create product catalog table from product catalog data 
 and set this table inside container having specified ID */
function createProductCatalogTable(productCatalogData, containerElementId) {
    /* Initialized variable to store product catalog table element */
    var productCatalogTableElement = ``;

    /* Added header of table */
    productCatalogTableElement += productCatalogTableHeader;

    /* Iterating over each json object inside 'data' key */
    for (datum in productCatalogData) 
    {
        /* Iterating over each category */
        for (productCategory in productCatalogData[datum]) 
        {
            /* Stored category name */
            let categoryName = productCategory;

            /* Added Category header of table by replacing category name in template */
            productCatalogTableElement += productCatalogTableCatalogNameTemplate.format(categoryName);

            /* Stored product details of products in a category*/
            var productData = productCatalogData[datum][productCategory];
            /* Iterating over each product  */
            for (key in productData) 
            {
                /* Stored product detail of each product in a category*/
                var productDetails = productData[key];
                /* Added product details row by replacing values in template */
                productCatalogTableElement += productCatalogTableProductDetailsTemplate.format(productDetails.name,
                     productDetails.composition, productDetails.packsize, productDetails.form, productDetails.pack, productDetails.image);
            }
            /* Added footer 1 (closer tag for table,divs etc) of table */
            productCatalogTableElement += productCatalogTableFooter1;
        }
    }
    /* Added footer 2 (closer tag for accordion i.e. outermost div) of table */
    productCatalogTableElement += productCatalogTableFooter2;

    /* Set table inside container having specified ID */
    document.getElementById(containerElementId).innerHTML = productCatalogTableElement;
    /* Called method to set popover for displaying images for each 
    product in product catalog table */
    setProductImagePopover();

    /* Set table as datatable so that pagination and search can be added */
    $('.product-catalog-table-class').DataTable();
    $('.dataTables_length').addClass('bs-select');

    /* Set styling of datatable components by bootstrap classes */
    $('.dataTables_length').addClass('form-inline mb-2');
    $('.dataTables_length > label > select').addClass('form-control ml-1 mr-1');
    $('.dataTables_filter').addClass('form-inline mb-2');
    $('.dataTables_filter > label > input').addClass('form-control');
}

/* Function to set popover and content of popover for each 'view image'
   button of each product by taking url from 'product-img-url' attribute of button */
function setProductImagePopover() {
    /* Code block to open popover on click of button. Also content of popover is sent 
    in this code block  */
    $('.product-img-button').popover({
        html: true, content: function () {
            let imagePath = $(this).attr('product-img-url') !== '' ? $(this).attr('product-img-url') : NO_IMAGE_FILE_PATH;
            return '<img src="' + imagePath + '" alt="No Image Available" class="product-popover-img"/>'
            
        },
        toggle: 'manual'
    });
    /* Code block to open only one popover at a time i.e, dismiss previous one if new popover is opened. Also, 
    any open popover is closed if clicked outside popoover */
    $('body').on('click', function (e) {
        $('.product-img-button').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
}