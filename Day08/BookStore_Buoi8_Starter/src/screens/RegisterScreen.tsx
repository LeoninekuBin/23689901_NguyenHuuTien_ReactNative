import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { register } from "../services/authService"; // đã viết sẵn: register(name, email, password)
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  // lấy hàm signIn từ hook useAuth để tự động đăng nhập sau khi tạo tài khoản thành công
  const { signIn } = useAuth();

  // khai báo các state lưu trữ giá trị form đăng ký và thông báo lỗi
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // hàm submit đăng ký tài khoản mới
  const submit = async () => {
    // kiểm tra dữ liệu từng ô: họ tên bắt buộc, định dạng email, độ dài mật khẩu và so khớp mật khẩu nhập lại
    const e = {
      name: validateRequired("họ tên")(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: confirm === password ? null : "Mật khẩu nhập lại không khớp",
    };
    setErrors(e);

    // nếu có bất kỳ ô nào còn lỗi thì dừng lại không gọi API
    if (Object.values(e).some(Boolean)) return;

    // bật trạng thái loading để tránh người dùng nhấn nút liên tiếp
    setLoading(true);
    setSubmitError(null);

    try {
      // gọi API đăng ký tài khoản mới với name, email và password
      const { user, token } = await register(name, email, password);
      // đăng ký xong thì tự động lưu thông tin user và token vào Redux store
      signIn(user, token);

      // điều hướng: nếu trước đó đang muốn thanh toán thì quay lại Checkout, ngược lại về Home
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      // nếu gặp lỗi từ API (ví dụ email đã tồn tại) thì hiển thị câu thông báo lỗi
      setSubmitError(getErrorMessage(err));
    } finally {
      // tắt loading sau khi xử lý xong
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Tạo tài khoản mới</Text>

        {/* ô nhập Họ tên */}
        <FormField
          label="Họ tên"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />

        {/* ô nhập Email */}
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
        />

        {/* ô nhập Mật khẩu */}
        <FormField
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
        />

        {/* ô nhập Nhập lại mật khẩu */}
        <FormField
          label="Nhập lại mật khẩu"
          value={confirm}
          onChangeText={setConfirm}
          error={errors.confirm}
          secureTextEntry
        />

        {/* dòng thông báo lỗi chung nếu đăng ký thất bại */}
        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

        {/* nút Đăng ký tài khoản kèm trạng thái loading */}
        <PrimaryButton title="Đăng ký" onPress={submit} loading={loading} />

        <Pressable onPress={() => navigation.replace("Login", route.params)}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
});
