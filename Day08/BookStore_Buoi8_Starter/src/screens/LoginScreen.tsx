import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { login } from "../services/authService"; // đã viết sẵn: login(email, password) → { user, token }
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword } from "../utils/validators"; // đã viết sẵn: trả về chuỗi lỗi hoặc null
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  // lấy hàm signIn từ hook useAuth để lưu thông tin đăng nhập vào Redux store
  const { signIn } = useAuth();

  // khai báo các state quản lý dữ liệu form và trạng thái gửi dữ liệu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state ẩn/hiện mật khẩu (câu hỏi bổ sung 5)
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // hàm xử lý đăng nhập khi người dùng nhấn nút "Đăng nhập"
  const submit = async () => {
    // 1) kiểm tra tính hợp lệ của email và mật khẩu
    const e = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(e);
    // nếu một trong 2 ô có lỗi thì dừng lại, không gọi API
    if (e.email || e.password) return;

    // bật trạng thái loading và xóa lỗi trước đó
    setLoading(true);
    setSubmitError(null);

    try {
      // 2) gọi API đăng nhập với email và mật khẩu vừa nhập
      const { user, token } = await login(email, password);
      // lưu thông tin người dùng và token vào Redux store
      signIn(user, token);

      // 3) nếu được chuyển đến từ Checkout thì quay lại Checkout kèm theo tổng tiền
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        // ngược lại chuyển về màn hình Home chính
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      // 4) bắt lỗi (sai mật khẩu, lỗi mạng...) và gán câu thông báo lỗi
      setSubmitError(getErrorMessage(err));
    } finally {
      // tắt trạng thái loading sau khi gọi xong
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>📚</Text>
        <Text style={styles.title}>Đăng nhập BookStore</Text>

        {/* ô nhập Email */}
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
        />

        {/* ô nhập Mật khẩu kèm icon mắt 👁 ẩn/hiện mật khẩu (Câu hỏi bổ sung 5) */}
        <View style={styles.passwordContainer}>
          <FormField
            label="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry={!showPassword}
            style={{ paddingRight: 40 }}
          />
          <Pressable
            style={styles.eyeBtn}
            onPress={() => setShowPassword((prev) => !prev)}
            accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            hitSlop={6}
          >
            <Text style={styles.eyeText}>{showPassword ? "🙈" : "👁"}</Text>
          </Pressable>
        </View>

        {/* dòng hiển thị lỗi chung (nếu đăng nhập sai hoặc lỗi server) */}
        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

        {/* nút Đăng nhập kèm hiệu ứng đang tải */}
        <PrimaryButton title="Đăng nhập" onPress={submit} loading={loading} />

        <Pressable onPress={() => navigation.replace("Register", route.params)}>
          <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
        </Pressable>
        <View style={styles.hint}>
          <Text style={styles.hintText}>Tài khoản demo: demo@bookstore.vn / 123456</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  logo: { fontSize: 56, textAlign: "center" },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  passwordContainer: { position: "relative" },
  eyeBtn: { position: "absolute", right: 12, top: 34, padding: 4 },
  eyeText: { fontSize: 18 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
  hint: { backgroundColor: "#E0F2FE", padding: 10, borderRadius: 10 },
  hintText: { color: colors.navy, textAlign: "center", fontSize: 12 },
});
