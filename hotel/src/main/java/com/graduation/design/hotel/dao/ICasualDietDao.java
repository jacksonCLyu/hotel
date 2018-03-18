package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.CasualDietVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author QiShuo
 */
@Repository
public interface ICasualDietDao {
    List<CasualDietVO> getListCasualDiet();


    CasualDietVO getCasualDiet(Integer id);


    Integer insertCasualDiet(CasualDietVO vo);

    Integer updateCasualDiet(CasualDietVO
                                     vo);

    Integer deleteCasualDiet(Integer id);
}
