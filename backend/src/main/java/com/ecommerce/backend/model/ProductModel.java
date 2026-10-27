package com.ecommerce.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Double price;

    @Column(length = 2000)
    private String description;

    private String category;

    @Column(length = 1000)
    private String image;

    @Embedded
    private Rating rating;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Rating {
        private Double rate;
        private Integer count;
    }
}
