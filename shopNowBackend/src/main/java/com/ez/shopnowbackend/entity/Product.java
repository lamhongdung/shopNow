package com.ez.shopnowbackend.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
// 'product' is a table name in SQL
@Table(name="product")
// @Data = @Getter + @Setter + @ToString + EqualsAndHashCode + @RequiredArgsConstructor
// @Data: help to auto generate getter and setter
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "unitInStock")
    private int unitInStock;

    // foreign key "categoryId"
    @ManyToOne // many products under 1 productCategory
    @JoinColumn(name = "categoryId", nullable = false)
    private ProductCategory category;

    @Column(name = "dateCreated")
    // hibernate will auto manage the timestamps
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "lastUpdated")
    // hibernate will auto manage the timestamps
    @UpdateTimestamp
    private Date lastUpdated;
}

