package com.moogle;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

@SuppressWarnings("serial")
public class SearchServlet extends HttpServlet {
	
	//Set the max number of displayed hot search and the weight of some factors
	static int MAX_ROWS = 4;
	static int INIT_FATOR = 200;
	static int SIMILARITY_MULTIPLIER = 100;
	//This is the test hot search pool,key is the hot word and value is the weight
	//Assuming that the weight ranges from 0 to 100;
	static HashMap<String,Double> dataList=new HashMap<String,Double>();
	static{
		dataList.put("Java StringBuilder vs StringBuffer",50.0);
		dataList.put("Java inheritance and polymorphism",38.0);
		dataList.put("Java Hashmap",60.0);
		dataList.put("Java Hashset",47.0);
		dataList.put("Hashmap Hashset",80.0);
		dataList.put("Python class inheritance",40.0);
		dataList.put("Python list functions",12.0);
		dataList.put("Python Hash Table",70.0);
		dataList.put("Python vs Java",61.0);
		dataList.put("Programming Languages",90.0);
		
		
	}
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//Get keyword from client
		String keyword=request.getParameter("keyword");
		List<String> listData=getData(keyword);
		//Retrun Json
		response.getWriter().write(JSONArray.fromObject(listData).toString());
		//response.getWriter().write(keyword);

	}
	
	public List<String> getData(String keyword){
		//Use TreeMap to order the hot word by the weight
		TreeMap<Double, String> map = new TreeMap<Double, String>();
		List<String> result = new ArrayList<String>();
		Double factor;
		if(keyword != "")
		{
			Iterator it = dataList.keySet().iterator();  
	        while(it.hasNext()) {
	            String key = (String)it.next();  
	            if(key.toLowerCase().contains(keyword.toLowerCase())){
	            	factor = dataList.get(key) + getInitFactor(key,keyword) + getSimilarityFactor(key,keyword);//Add the weight 
	            	while(map.containsKey(factor)){factor += 0.1;}//In case there is duplicate key value.
	            	if(map.size()<MAX_ROWS){
	            		map.put(factor,key);
	            	}
	            	else{
	            		//Remove the hot word with the lowest weight if the number of results is greater that the maximum
	            		if(factor > map.firstKey()){
	            			map.remove(map.firstKey());
	            			map.put(factor,key);
	            		}
	            	}
	            }
	        }
	        //Set the result, order by weight DESC.
	        while(!map.isEmpty()){
	        	result.add(map.get(map.lastKey()));
	        	map.remove(map.lastKey());
	        }
		}
		return result;
	}
	//Check if the hot word starts with the keyword that user typed in
	private double getInitFactor(String key, String keyword){
		return (double)(key.toLowerCase().indexOf(keyword.toLowerCase()) == 0 ? INIT_FATOR : 0);
	}
	
	//Check the similarity of the hot word and the keyword that user typed in
	private double getSimilarityFactor(String key, String keyword){
		double factor = (double)keyword.length() / key.length();
		BigDecimal decimalFactor = new BigDecimal(factor);
		return decimalFactor.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue() * SIMILARITY_MULTIPLIER;
	}
	

}
