package com.example.demo.repository;

import com.example.demo.domain.Department;
import com.example.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Frank.Park on 2018. 9. 20..
 */
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findAllByUserAndCategory(User user, String category);
}
