package com.example.shopreview.controllers;

import com.example.shopreview.models.Product;
import com.example.shopreview.models.ProductMypriceDto;
import com.example.shopreview.models.ProductRepository;
import com.example.shopreview.models.ProductRequestDto;
import com.example.shopreview.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductService productService;

    @GetMapping("/api/products")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/api/products")
    public Product createProduct(@RequestBody ProductRequestDto requestDto) {
        Product p = new Product(requestDto);
        return productRepository.save(p);
    }

    @PutMapping("/api/products/{id}")
    public Long updateMyprice(@PathVariable Long id, @RequestBody ProductMypriceDto mypriceDto) {
        return productService.updateMyprice(id, mypriceDto);
    }

    @DeleteMapping("/api/products/{id}")
    public Long deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return id;
    }
}
