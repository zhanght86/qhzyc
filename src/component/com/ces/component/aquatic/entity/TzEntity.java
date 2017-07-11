package com.ces.component.aquatic.entity;

import com.ces.xarch.core.entity.StringIDEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by 黄翔宇 on 15/7/7.
 * 台帐
 */
@Entity
@Table(name = "t_sc_tz")
public class TzEntity extends StringIDEntity {

	/**
	 * 企业编码
	 */
	private String qybm;
	/**
	 * 企业名称
	 */
	private String qymc;
	/**
	 * 商户id
	 */
	private String shid;
	/**
	 * 商户名称
	 */
	private String shmc;
	/**
	 * 台帐类型
	 */
	private String tzlx;
	/**
	 * 上报时间
	 */
	private String sbsj;
	/**
	 * 更新时间
	 */
	private String gxsj;
	/**
	 * 商铺编号
	 */
	private String spbh;

	public String getQybm() {
		return qybm;
	}

	public void setQybm(String qybm) {
		this.qybm = qybm;
	}

	public String getQymc() {
		return qymc;
	}

	public void setQymc(String qymc) {
		this.qymc = qymc;
	}

	public String getShid() {
		return shid;
	}

	public void setShid(String shid) {
		this.shid = shid;
	}

	public String getShmc() {
		return shmc;
	}

	public void setShmc(String shmc) {
		this.shmc = shmc;
	}

	public String getTzlx() {
		return tzlx;
	}

	public void setTzlx(String tzlx) {
		this.tzlx = tzlx;
	}

	public String getSbsj() {
		return sbsj;
	}

	public void setSbsj(String sbsj) {
		this.sbsj = sbsj;
	}

	public String getGxsj() {
		return gxsj;
	}

	public void setGxsj(String gxsj) {
		this.gxsj = gxsj;
	}

	public String getSpbh() {
		return spbh;
	}

	public void setSpbh(String spbh) {
		this.spbh = spbh;
	}
}