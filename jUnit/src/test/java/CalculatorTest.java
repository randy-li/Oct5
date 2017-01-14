import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class CalculatorTest {

	@Test
	public void evaluatesExpression() {
		Calculator calculate = new Calculator();
		int sum = calculate.add(1,2);
		assertEquals(3, sum);
	}
}
