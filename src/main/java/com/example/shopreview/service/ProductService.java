package com.example.shopreview.service;

import com.example.shopreview.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional // update Low price
    public Long updateLowPrice(Long id, SearchItemDto itemDto) {
        Product p = productRepository.findById(id).orElseThrow(
                ()->new NullPointerException("ID NOT found!")
        );
        p.update(itemDto);
        return id;
    }

    @Transactional // update myprice
    public Long updateMyprice(Long id, ProductMypriceDto mypriceDto) {
        Product p = productRepository.findById(id).orElseThrow(
                ()->new NullPointerException("ID NOT found!")
        );
        p.updateMyprice(mypriceDto);
        return id;
    }
}
