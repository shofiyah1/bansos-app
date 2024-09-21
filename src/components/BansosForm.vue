<template>
    <div class="app-container">
        <!-- Header Section -->
        <header class="app-header">
            <div class="header-content">
                <h1>Bantuan Sosial</h1>
                <p>Form Permohonan Bantuan Sosial untuk Masyarakat</p>
            </div>
        </header>

        <!-- Form Section -->
        <section class="form-section">
            <form @submit.prevent="submitForm" class="form-container">
                <!-- Input fields for user data -->
                <div class="form-group">
                    <label>Nama:</label>
                    <input v-model="formData.name" type="text" required class="form-input"
                        placeholder="Masukkan nama lengkap" />
                </div>
                <div class="form-group">
                    <label>NIK:</label>
                    <input v-model="formData.nik" type="number" required class="form-input"
                        placeholder="Masukkan NIK" />
                </div>
                <div class="form-group">
                    <label>Nomor Kartu Keluarga:</label>
                    <input v-model="formData.kartuKeluarga" type="number" required class="form-input"
                        placeholder="Masukkan nomor KK" />
                </div>

                <!-- File upload for KTP -->
                <div class="form-group">
                    <label>Foto KTP:</label>
                    <input type="file" @change="onFileChange('ktp', $event)" accept="image/jpeg, image/png, image/bmp"
                        required />
                    <small>Maksimal 2MB, format JPG/JPEG/PNG/BMP</small>
                    <p v-if="fileErrors.ktp" class="error-text">{{ fileErrors.ktp }}</p>
                </div>

                <!-- File upload for Kartu Keluarga -->
                <div class="form-group">
                    <label>Foto Kartu Keluarga:</label>
                    <input type="file" @change="onFileChange('kk', $event)" accept="image/jpeg, image/png, image/bmp"
                        required />
                    <small>Maksimal 2MB, format JPG/JPEG/PNG/BMP</small>
                    <p v-if="fileErrors.kk" class="error-text">{{ fileErrors.kk }}</p>
                </div>

                <!-- Dropdowns for address selection -->
                <div class="form-group">
                    <label>Provinsi:</label>
                    <select v-model="formData.province" @change="fetchKabupaten" required class="form-select">
                        <option value="" disabled selected>Pilih Provinsi</option>
                        <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name
                            }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Kabupaten/Kota:</label>
                    <select v-model="formData.city" @change="fetchKecamatan" required class="form-select">
                        <option value="" disabled selected>Pilih Kabupaten/Kota</option>
                        <option v-for="city in kabupatens" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Kecamatan:</label>
                    <select v-model="formData.subdistrict" @change="fetchKelurahan" required class="form-select">
                        <option value="" disabled selected>Pilih Kecamatan</option>
                        <option v-for="subdistrict in kecamatans" :key="subdistrict.id" :value="subdistrict.id">{{
                            subdistrict.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Kelurahan/Desa:</label>
                    <select v-model="formData.village" required class="form-select">
                        <option value="" disabled selected>Pilih Kelurahan/Desa</option>
                        <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}
                        </option>
                    </select>
                </div>

                <!-- Additional user details -->
                <div class="form-group">
                    <label>Umur:</label>
                    <input v-model="formData.age" type="number" required class="form-input"
                        placeholder="Masukkan umur" />
                </div>
                <div class="form-group">
                    <label>Jenis Kelamin:</label>
                    <select v-model="formData.gender" required class="form-select">
                        <option value="" disabled selected>Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Alamat:</label>
                    <input v-model="formData.address" type="text" required class="form-input"
                        placeholder="Masukkan alamat" />
                    <p v-if="addressError" class="error-text">{{ addressError }}</p>
                </div>
                <div class="form-group">
                    <label>RT:</label>
                    <input v-model="formData.rt" type="number" required class="form-input" placeholder="Masukkan RT" />
                </div>
                <div class="form-group">
                    <label>RW:</label>
                    <input v-model="formData.rw" type="number" required class="form-input" placeholder="Masukkan RW" />
                </div>
                <div class="form-group">
                    <label>Penghasilan Sebelum Pandemi:</label>
                    <input v-model="formData.incomeBeforePandemic" type="number" required class="form-input"
                        placeholder="Masukkan penghasilan" />
                </div>
                <div class="form-group">
                    <label>Penghasilan Setelah Pandemi:</label>
                    <input v-model="formData.incomeAfterPandemic" type="number" required class="form-input"
                        placeholder="Masukkan penghasilan" />
                </div>
                <div class="form-group">
                    <label>Alasan Membutuhkan Bantuan:</label>
                    <select v-model="formData.assistanceReason" @change="checkOtherReason" required class="form-select">
                        <option value="" disabled selected>Pilih Alasan</option>
                        <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
                        <option value="Kepala keluarga">Kepala keluarga</option>
                        <option value="Tergolong fakir/miskin">Tergolong fakir/miskin</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>
                <div v-if="showOtherReason" class="form-group">
                    <label>Silakan jelaskan:</label>
                    <input v-model="formData.otherReason" type="text" class="form-input"
                        placeholder="Masukkan alasan lainnya" />
                </div>

                <!-- Agreement checkbox -->
                <div class="form-group checkbox-group">
                    <label>
                        <input type="checkbox" v-model="formData.isAgreed" required />
                        Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila
                        ditemukan ketidaksesuaian.
                    </label>
                </div>
                <button type="submit" :disabled="!formData.isAgreed" class="btn-submit">
                    Submit
                </button>
            </form>
            <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }" class="form-message">
                {{ message }}
            </p>
        </section>
        <footer class="app-footer">
            <p>&copy; 2024 Shofiyah</p>
        </footer>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                // Data collected from the form
                name: '',
                nik: '',
                kartuKeluarga: '',
                province: null,
                city: null,
                subdistrict: null,
                village: null,
                age: null,
                gender: '',
                address: '',
                rt: null,  
                rw: null,  
                incomeBeforePandemic: null,
                incomeAfterPandemic: null,
                assistanceReason: '',
                otherReason: '',
                ktp: null,
                kk: null,
                isAgreed: false,
            },
            fileErrors: {
                ktp: '',
                kk: '',
            },
            addressError: '',
            hasFileErrors: false,
            provinces: [],
            kabupatens: [],
            kecamatans: [],
            villages: [],
            message: '',
            isSuccess: false,
            showOtherReason: false,
        };
    },
    mounted() {
        // Fetch initial data when component is mounted
        this.fetchProvinces();
    },
    methods: {
        // Fetch list of provinces
        async fetchProvinces() {
            try {
                const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
                this.provinces = response.data;
            } catch (error) {
                this.message = 'Unable to load provinces.';
            }
        },

        // Fetch kabupaten based on selected province
        async fetchKabupaten() {
            try {
                const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.formData.province}.json`);
                this.kabupatens = response.data;
            } catch (error) {
                this.message = 'Unable to load kabupaten.';
            }
        },

        // Fetch kecamatan based on selected city
        async fetchKecamatan() {
            try {
                const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.formData.city}.json`);
                this.kecamatans = response.data;
            } catch (error) {
                this.message = 'Unable to load kecamatan.';
            }
        },

        // Fetch kelurahan based on selected subdistrict
        async fetchKelurahan() {
            try {
                const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${this.formData.subdistrict}.json`);
                this.villages = response.data;
            } catch (error) {
                this.message = 'Unable to load kelurahan.';
            }
        },

        // Handle file input change
        onFileChange(field, event) {
            const file = event.target.files[0];
            if (file) {
                // Validate file size (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    this.fileErrors[field] = 'Ukuran file maksimal 2MB.';
                } else {
                    // Validate file type
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];
                    if (!allowedTypes.includes(file.type)) {
                        this.fileErrors[field] = 'Format file harus JPG, JPEG, PNG, atau BMP.';
                    } else {
                        // If valid, save file and clear error message
                        this.formData[field] = file;
                        this.fileErrors[field] = '';
                    }
                }
            } else {
                this.fileErrors[field] = '';
            }

            // Check for any file errors
            this.hasFileErrors = this.fileErrors.ktp || this.fileErrors.kk;
        },

        // Show additional input if 'Other' reason is selected
        checkOtherReason() {
            this.showOtherReason = this.formData.assistanceReason === 'Lainnya';
        },

        // Submit the form
        submitForm() {
            this.addressError = '';

            // Validate address length
            if (this.formData.address.length > 255) {
                this.addressError = 'Alamat tidak boleh lebih dari 255 karakter.';
                return;
            }

            // Simulate form submission
            setTimeout(() => {
                const success = Math.random() < 0.8; // 80% chance of success
                if (success) {
                    this.message = 'Data berhasil dikirim!';
                    this.isSuccess = true;

                    // Get names based on selected IDs
                    const provinceName = this.provinces.find(p => p.id === this.formData.province)?.name;
                    const cityName = this.kabupatens.find(c => c.id === this.formData.city)?.name;
                    const subdistrictName = this.kecamatans.find(k => k.id === this.formData.subdistrict)?.name;
                    const villageName = this.villages.find(v => v.id === this.formData.village)?.name;

                    // Create object URLs for uploaded files
                    const ktpUrl = URL.createObjectURL(this.formData.ktp);
                    const kkUrl = URL.createObjectURL(this.formData.kk);

                    // Serialize form data for preview
                    const queryData = new URLSearchParams({
                        ...this.formData,
                        province: provinceName,
                        city: cityName,
                        subdistrict: subdistrictName,
                        village: villageName,
                        ktp: ktpUrl,
                        kk: kkUrl,
                    }).toString();

                    // Navigate to preview page with form data
                    this.$router.push({ name: 'Preview', query: { data: queryData } });
                } else {
                    this.message = 'Pengiriman data gagal. Silakan coba lagi.';
                    this.isSuccess = false;
                }
            }, 1500); // Simulate a 1.5 second delay
        }
    },
};
</script>

<style>
body {
    font-family: 'Poppins', sans-serif;
    background-color: #f0f2f5;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}

.app-container {
    padding: 30px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.app-header {
    background: linear-gradient(45deg, #6a11cb, #2575fc);
    color: white;
    text-align: center;
    padding: 40px 0;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%;
    max-width: 870px;
}

.header-content h1 {
    font-size: 40px;
    margin: 0;
    font-weight: bold;
}

.header-content p {
    font-size: 18px;
    margin-top: 10px;
    opacity: 0.8;
}

.form-section {
    background-color: white;
    padding: 30px;
    margin-top: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
}

.form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    color: #34495e;
}

.form-input,
.form-select {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
}

.form-input:focus,
.form-select:focus {
    border-color: #6a11cb;
    box-shadow: 0 0 8px rgba(106, 17, 203, 0.2);
}

.checkbox-group {
    grid-column: span 2;
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-submit {
    grid-column: span 2;
    padding: 15px;
    font-size: 18px;
    background: linear-gradient(45deg, #6a11cb, #2575fc);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
}

.btn-submit:hover {
    background: linear-gradient(45deg, #5f0fca, #1d66f9);
    transform: translateY(-2px);
}

.btn-submit:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
}

.form-message {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
}

.success {
    color: green;
}

.error {
    color: red;
}

.app-footer {
    background: linear-gradient(45deg, #ffffff, #e6e6e6);
    color: #2c3e50;
    text-align: center;
    padding: 15px 0;
    border-radius: 15px;
    width: 100%;
    margin-top: 50px;
    /* Memastikan footer tetap di bawah */
}

/* Responsive styles */
@media (max-width: 768px) {
    .form-container {
        grid-template-columns: 1fr;
    }

    .checkbox-group,
    .btn-submit {
        grid-column: span 1;
    }
}
</style>
