package tests;

import junit.framework.TestCase;
import static org.junit.Assert.*;
import src.AddOperation;

public class AddOperationTestWithoutAnnotation extends TestCase {
	
	public void setUp() throws Exception {
	}


	public void tearDown() throws Exception {
	}


	public void testAdd(){
		System.out.println("add");
		int x = 0;
		int y = 0;
		AddOperation instance = new AddOperation();
		int expResult = 0;
		int result = instance.add(x, y);
		assertEquals(expResult, result);
	}
}
