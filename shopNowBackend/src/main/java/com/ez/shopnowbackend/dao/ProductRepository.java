package com.ez.shopnowbackend.dao;

import com.ez.shopnowbackend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

// Accept calls from web browser scripts from any origin
//@CrossOrigin("http://localhost:4200")
@CrossOrigin
// http://localhost:8080/api/product
// collectionResourceRel = "product": the "product" in the json
// path = "product": "product" in the path http://localhost:8080/api/product
@RepositoryRestResource(collectionResourceRel = "product", path = "product")
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    // select *
    // from Product p
    // where p.name like concat('%',:name,'%')
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
