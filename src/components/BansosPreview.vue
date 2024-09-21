<template>
    <div class="preview-container">
        <header class="preview-header">
            <h1>Preview Data Permohonan Bantuan Sosial</h1>
        </header>
        <section class="preview-content">
            <div class="data-section">
                <h3>Informasi Pribadi</h3>
                <p><strong>Nama:</strong> {{ localData.name }}</p>
                <p><strong>NIK:</strong> {{ localData.nik }}</p>
                <p><strong>Nomor Kartu Keluarga:</strong> {{ localData.kartuKeluarga }}</p>
                <div class="image-container">
                    <h4>Foto KTP:</h4>
                    <img :src="localData.ktp" alt="KTP" v-if="localData.ktp" class="preview-image" />
                </div>
                <div class="image-container">
                    <h4>Foto Kartu Keluarga:</h4>
                    <img :src="localData.kk" alt="Kartu Keluarga" v-if="localData.kk" class="preview-image" />
                </div>
                <p><strong>Provinsi:</strong> {{ localData.province }}</p>
                <p><strong>Kabupaten/Kota:</strong> {{ localData.city }}</p>
                <p><strong>Kecamatan:</strong> {{ localData.subdistrict }}</p>
                <p><strong>Kelurahan/Desa:</strong> {{ localData.village }}</p>
                <p><strong>Umur:</strong> {{ localData.age }}</p>
                <p><strong>Jenis Kelamin:</strong> {{ localData.gender }}</p>
                <p><strong>Alamat:</strong> {{ localData.address }}</p>
                <p><strong>Penghasilan Sebelum Pandemi:</strong> {{ localData.incomeBeforePandemic }}</p>
                <p><strong>Penghasilan Setelah Pandemi:</strong> {{ localData.incomeAfterPandemic }}</p>
                <p><strong>Alasan Membutuhkan Bantuan:</strong>
                    {{ localData.assistanceReason }}
                    <span v-if="localData.assistanceReason === 'Lainnya'">- {{ localData.otherReason }}</span>
                </p>
            </div>
        </section>
        <button @click="goBack" class="btn-back">Kembali</button>
    </div>
</template>

<script>
export default {
    computed: {
        localData() {
            const queryData = this.$route.query.data;
            if (queryData) {
                const params = new URLSearchParams(queryData);
                return {
                    name: params.get('name'),
                    nik: params.get('nik'),
                    kartuKeluarga: params.get('kartuKeluarga'),
                    province: params.get('province'),
                    city: params.get('city'),
                    subdistrict: params.get('subdistrict'),
                    village: params.get('village'),
                    age: params.get('age'),
                    gender: params.get('gender'),
                    address: params.get('address'),
                    incomeBeforePandemic: params.get('incomeBeforePandemic'),
                    incomeAfterPandemic: params.get('incomeAfterPandemic'),
                    assistanceReason: params.get('assistanceReason'),
                    otherReason: params.get('otherReason'),
                    ktp: params.get('ktp'),
                    kk: params.get('kk'),
                };
            }
            return {};
        },
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'Form' });
        },
    },
};
</script>

<style>
.preview-container {
    font-family: 'Arial', sans-serif;
    background-color: #f1f4f9;
    color: #2c3e50;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.preview-header {
    background-color: #3498db;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
}

.preview-content {
    margin-top: 20px;
}

.data-section {
    margin-bottom: 20px;
}

.data-section h3 {
    margin-bottom: 10px;
    color: #2980b9;
}

.image-container {
    margin-bottom: 15px;
}

.preview-image {
    width: 500px;
    height: 250px;
    object-fit: contain;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn-back {
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-back:hover {
    background-color: #2980b9;
}
</style>
