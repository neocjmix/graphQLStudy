package com.example.demo.repository;

import com.example.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Frank.Park on 2018. 9. 20..
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {}
