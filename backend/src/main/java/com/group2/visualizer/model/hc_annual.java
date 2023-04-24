package com.group2.visualizer.model;
import javax.persistence.*;
@Table(name = "hc_annual")
public class hc_annual {
    @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  //private Integer id;

  private Integer year_;

  private double moberg;

  private Double global_;

  private Double northern;

  private Double southern;


    /*public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }*/

    public Integer getYear_() {
        return this.year_;
    }

    public void setYear_(Integer year_) {
        this.year_ = year_;
    }

    public double getMoberg() {
        return this.moberg;
    }

    public void setMoberg(double moberg) {
        this.moberg = moberg;
    }

    public Double getGlobal_() {
        return this.global_;
    }

    public void setGlobal_(Double global_) {
        this.global_ = global_;
    }

    public Double getNorthern() {
        return this.northern;
    }

    public void setNorthern(Double northern) {
        this.northern = northern;
    }

    public Double getSouthern() {
        return this.southern;
    }

    public void setSouthern(Double southern) {
        this.southern = southern;
    }


}
