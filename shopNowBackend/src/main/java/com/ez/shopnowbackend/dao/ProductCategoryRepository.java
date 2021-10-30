package com.ez.shopnowbackend.dao;

import com.ez.shopnowbackend.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// Accept calls from web browser scripts from any origin
@CrossOrigin
// collectionResourceRel = "name of json entry"
// path = path in the URL. ex: /api/product-category
// http://localhost:8080/api/product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
