package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.CasualDietVO;

import java.util.List;

/**
 * @author QiShuo
 */
public interface ICasualDietService {

    List<CasualDietVO> getListCasualDiet();


    CasualDietVO getCasualDiet(Integer id);


    Integer insertCasualDiet(CasualDietVO vo);

    Integer updateCasualDiet(CasualDietVO
                                     vo);

    Integer deleteCasualDiet(Integer id);
}
