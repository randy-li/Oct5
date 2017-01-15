import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.junit.Ignore;

public class CalculatorTest {
	private static Calculator calculator = new Calculator();
	
	@Before
	public void setUp() throws Exception {
		calculator.clear();
	}

	@Test
	public void testAdd() {
		calculator.add(2);
		calculator.add(3);
		assertEquals(5, calculator.getResult());
	}
}
