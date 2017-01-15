import java.lang.String;

public class Calculator{

	private static int result; //static varaible, store the calculate result
	public void add(int n) {
		result = result + n;
	}

	public void substract(int n) {
		result = result - n;
	}

	public void multipy(int n) {
		result = result * n;
	}

	public void divide(int n) {
		result = result / n;
	}

	public void square(int n) {
		result = n * n;
	}

	public void squareRoot(int n) {
		result = (int) Math.sqrt(n);
	}

	public void clear() {
		result = 0;
	}

	public int getResult() {
		return result;
	}
}
