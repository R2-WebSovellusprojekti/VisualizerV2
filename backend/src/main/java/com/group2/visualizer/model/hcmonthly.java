package com.group2.visualizer.model;
import javax.persistence.*;
@Entity
@Table(name = "hc_monthly")
public class hcmonthly {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  //private Integer id;

  private Integer year_;

  private Integer month_;

  private Double global_;

  private Double northern;

  private Double southern;

  // Getters and setters
 /*  public int getId() {
    return id;
}

public void setId(int id) {
    this.id = id;
}*/
  public Integer getYear_() {
    return year_;
}

public void setYear_(Integer year_) {
    this.year_ = year_;
}

public Integer getMonth_() {
    return month_;
}

public void setMonth_(Integer month_) {
    this.month_ = month_;
}

public Double getGlobal_() {
    return global_;
}

public void setGlobal_(Double global_) {
    this.global_ = global_;
}

public Double getNorthern() {
    return northern;
}

public void setNorthern(Double northern) {
    this.northern = northern;
}

public Double getSouthern() {
    return southern;
}

public void setSouthern(Double southern) {
    this.southern = southern;
}
}

