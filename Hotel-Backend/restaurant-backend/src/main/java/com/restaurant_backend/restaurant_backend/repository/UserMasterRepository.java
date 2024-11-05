package com.restaurant_backend.restaurant_backend.repository;

import com.restaurant_backend.restaurant_backend.entity.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserMasterRepository extends JpaRepository<UserMaster,Long> {

    @Query("SELECT u FROM UserMaster u WHERE u.userName = :userName")
    Optional<UserMaster> findByUserName(@Param("userName") String userName);
}


