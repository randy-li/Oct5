import java.io.Closeable;
import java.io.IOException;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestFixturesExample {
	static class ExpensiveManagedResource implements Closeable {
		@Override
		public void close() throws IOException {}
	}

	static class ManageResource implements Closeable {
		@Override
		public void close() throws IOException {}
	}

	@BeforeClass
	public static void setUpClass() {
		System.out.println("@BeforeClass setUpClass");
		myExpensiveManagedResource = new ExpensiveManagedResource();
	}

	@AfterClass
	public static void tearDownClass() throws IOException {
		System.out.println("@AfterClass tearDownClass");
		myExpensiveManagedResource.close();
		myExpensiveManagedResource = null;
	}

	private ManageResource myManagedResource;
	private static ExpensiveManagedResource myExpensiveManagedResource;

	private void println(String string) {
		System.out.println(string);
	}

	@Before
	public void setUp() {
		this.println("@Before setUp");
		this.myManagedResource = new ManageResource();
	}

	@After
	public void tearDown() throws IOException {
		this.println("@After tearDown");
		this.myManagedResource.close();
		this.myManagedResource = null;
	}

	@Test
	public void test1() {
		this.println("@Test test1()");
	}

	@Test
	public void test2() {
		this.println("@Test test2()");
	}
}
